# users_management/management/commands/create_admin_user.py

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Creates a fully privileged admin user (superuser and staff) with username "admin" and password "admin123"'

    def handle(self, *args, **options):
        User = get_user_model()

        if not User.objects.filter(username='admin').exists():
            admin_user = User.objects.create_user(
                username='admin',
                password='admin123',
                email='admin@example.com',
                is_superuser=True,
                is_staff=True
            )
            self.stdout.write(self.style.SUCCESS('Admin user created with full privileges.'))
        else:
            self.stdout.write(self.style.WARNING('Admin user already exists.'))
