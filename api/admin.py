from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from api.models import *
# Register your models here.

class NoteTagsInline(admin.TabularInline):
    model = Note.tags.through
    verbose_name = "Tag"
    verbose_name_plural = "Tags"
    extra = 1
    pass

class MembershipsInline(admin.TabularInline):
    model = Membership
    verbose_name = "Membership"
    verbose_name_plural = "Memberships"
    extra = 1
    pass

class FavouritesInline(admin.TabularInline):
    model = User.favourites.through
    verbose_name = "Favourite tag"
    verbose_name_plural = "Favourite tags"
    extra = 1
    pass

class UserSettingsInline(admin.TabularInline):
    model = UserSetting
    verbose_name = "Setting"
    verbose_name_plural = "Settings"
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
    )
    list_display = ['id', 'username', 'email', 'password']
    inlines = [MembershipsInline, UserSettingsInline, FavouritesInline]
    exclude = ['settings']
    pass

class WorkgroupAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    inlines = [MembershipsInline]
    pass

admin.site.register(Workgroup, WorkgroupAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Setting, SettingAdmin)