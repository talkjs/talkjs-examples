from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from talkjs.models import TalkJSUser

class Command(BaseCommand):
    help = 'Deletes existing users and seeds the database with test users'

    def handle(self, *args, **options):
        # Delete existing users
        User.objects.all().delete()
        self.stdout.write(self.style.WARNING('Deleted all existing users'))

        # Define the specific users
        test_users = [
            {
                'username': 'alice',
                'first_name': 'Alice',
                'email': 'alice@example.com',
                'password': 'alicepassword',
                'photo_url': 'https://talkjs.com/new-web/avatar-14.jpg',
                'welcome_message': 'Hey!',
                'role': 'default'
            },
            {
                'username': 'sebastian',
                'first_name': 'Sebastian',
                'email': 'sebastian@example.com',
                'password': 'sebastianpassword',
                'photo_url': 'https://talkjs.com/new-web/avatar-8.jpg',
                'welcome_message': 'Hi, how are you?',
                'role': 'default'
            },
            {
                'username': 'nina',
                'first_name': 'Nina',
                'email': 'nina@example.com',
                'password': 'ninapassword',
                'photo_url': 'https://talkjs.com/new-web/avatar-12.jpg',
                'welcome_message': 'How can I help?',
                'role': 'default'
            }
        ]

        for user_data in test_users:
            user = User.objects.create_user(
                username=user_data['username'],
                email=user_data['email'],
                password=user_data['password']
            )
            user.first_name = user_data['first_name']
            user.save()
            
            TalkJSUser.objects.create(
                user=user,
                photo_url=user_data['photo_url'],
                welcome_message=user_data['welcome_message'],
                role=user_data['role']
            )

        self.stdout.write(self.style.SUCCESS(f'Created test users'))