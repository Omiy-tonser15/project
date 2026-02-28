from django.apps import AppConfig
import os

class GarageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'garage'

    def ready(self):
        from django.contrib.auth import get_user_model
        if os.environ.get('CREATE_SUPERUSER') == 'True':
            User = get_user_model()
            if not User.objects.filter(username='omar').exists():
                User.objects.create_superuser('omar', 'omar@gmail.com', 'omar15')
                print("✅ Superuser omar created")
            else:
                print("ℹ️ Superuser omar already exists")
