# class MeView(APIView):
    # permission_classes = (IsAuthenticated,)

    # def get(self, request):
        # serializer = MeSerializer(request.user)
        # return Response(serializer.data)


class AccessTokenCreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AccessTokenSerializer
    queryset = AccessToken.objects.all()


class PageCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PageSerializer
    queryset = Page.objects.all()
    filter_backends = (IsOwnerFilter,)

    def create(self, *args, **kwargs):
        id = self.request.data['id']
        if id:
            try:
                Page.objects.get(id=id)
                raise FBPageExistence()
            except Page.DoesNotExist:
                return super(PageCreateView, self).create(*args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PageRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsOwner)
    serializer_class = PageSerializer
    queryset = Page.objects.all()


class PageTabListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PageTabSerializer

    def get_queryset(self):
        parent = self.kwargs.get('page_id')
        if Page.objects.filter(pk=parent).exists():
            page = Page.objects.get(pk=parent)
            page = get_object_or_404(Page, pk=parent)
            params = {
                'page_access_token': page.access_token.token,
                'page_id': parent
            }
            helpers.parse_update_page_tabs(parent, facebook_api.list_tab(**params))
        return PageTab.objects.filter(page_id=parent)

    def create(self, *args, **kwargs):
        parent = get_object_or_404(Page, pk=self.kwargs.get('page_id'))
        if parent.user != self.request.user:
            raise PermissionDenied('You\'re not allowed to access this page')
        self.request.data['page'] = parent
        self.request.data['fb_application'] = parent.get_available_apps()
        return super(PageTabListCreateView, self).create(*args, **kwargs)

    def perform_create(self, serializer):
        data = serializer.validated_data
        params = {
            'page_access_token': data['page'].access_token.token,
            'page_id': data['page'].id,
            'app_id': data['fb_application'].app_id
        }
        facebook_api.create_tab(**params)
        facebook_api.update_tab(name=data['name'], position=data['position'], **params)
        params = {
            'page_access_token': data['page'].access_token.token,
            'page_id': data['page'].id
        }
        helpers.parse_update_page_tabs(data['page'].id, facebook_api.list_tab(**params))
        serializer.save()


class PageTabRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsOwner)
    serializer_class = PageTabSerializer
    queryset = PageTab.objects.all()

    def update(self, *args, **kwargs):
        instance = get_object_or_404(PageTab, pk=self.kwargs.get('pk'))
        self.request.data['page'] = instance.page
        self.request.data['fb_application'] = [instance.fb_application]
        return super(PageTabRetrieveUpdateDestroyView, self).update(*args, **kwargs)

    def perform_update(self, serializer):
        pass

    def perform_destroy(self, instance):
        parent_page = instance.page
        facebook_api.delete_tab(
            page_access_token=parent_page.access_token.token,
            page_id=parent_page.id,
            app_id=instance.fb_application.app_id
        )
        instance.delete()
        if not parent_page.tabs.count():
            parent_page.access_token.delete()
            parent_page.delete()
