from django import forms
from .models import Profile
from django.contrib.auth.models import User

class UserRegisterForm(forms.Form):
    username = forms.CharField(required=True)
    email = forms.EmailField(required=True)

    def clean_email(self):
        return self.validate_form_data('email')

    def clean_username(self):
        return self.validate_form_data('username')

    def validate_form_data(self, field_str):
        field = self.cleaned_data.get(field_str)
        object_value = False

        if field_str == 'email':
            object_value = User.objects.filter(email=field)
        else:
            object_value = User.objects.filter(username=field)

        if field and object_value.count() > 0:
            raise forms.ValidationError(f'\'{field}\' is already in use!')
        return field

    def register(self):
        user = User(username=self.clean_username(), email=self.clean_email())
        user.save()
        return user

class UserLoginForm(forms.Form):
    username = forms.CharField(required=True)

    def clean_username(self):
        username = self.cleaned_data.get('username')

        if username and not User.objects.filter(username=username).first():
            raise forms.ValidationError('Account with this username was not found!')
        return username

    def login(self):
        return User.objects.get(username=self.clean_username())

class UserUpdateForm(forms.ModelForm):
    username = forms.CharField(max_length=100, required=True)

    class Meta:
        model = User
        fields = ['username']

class ProfileUpdateForm(forms.ModelForm):
    image_url = forms.URLField(required=True, max_length=2048)
    
    class Meta:
        model = Profile
        fields = ['welcome_message', 'image_url']

