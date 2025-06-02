from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from api.models import *
# Register your models here.

class NoteTagsInline(admin.TabularInline):
    model = Note.tags.through
    extra = 1
    pass

class MembershipsInline(admin.TabularInline):
    model = Membership
    extra = 1
    pass

class UserSettingsInline(admin.TabularInline):
    model = UserSetting
    extra = 1
    pass

class NoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'group', 'lastEdited', 'lastEditor']
    inlines = [NoteTagsInline]
    exclude = ['tags']
    pass

class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'color']
    pass

class SettingAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description']
    pass

class UserAdmin(auth_admin.UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
        (('Permissions'), {
        'fields': ('is_active', 'is_staff', 'is_superuser'),
        }),
    )
    list_display = ['id', 'username', 'email', 'password']
    inlines = [MembershipsInline, UserSettingsInline]
    exclude = ['settings']
    pass

admin.site.register(User, UserAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Setting, SettingAdmin)