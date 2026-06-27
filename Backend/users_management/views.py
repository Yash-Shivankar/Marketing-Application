from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserCreateSerializer

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAdminUser]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def set_admin(self, request, pk=None):
        user = self.get_object()
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return Response({'status': 'user set as admin'})
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def remove_admin(self, request, pk=None):
        user = self.get_object()
        if user == request.user:
            return Response(
                {'error': 'Cannot remove admin privileges from yourself'},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.is_staff = False
        user.is_superuser = False
        user.save()
        return Response({'status': 'admin privileges removed'})