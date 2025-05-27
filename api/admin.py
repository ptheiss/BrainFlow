from django.contrib import admin
from api.models import *
# Register your models here.
class NoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'tags', 'lastEdited', 'lastEditor']
    pass

class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'color', 'parent']
    pass

class SettingAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description']
    pass

class UserSettingAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'setting_id', 'state']
    pass

admin.site.register(Note, NoteAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Setting, SettingAdmin)
admin.site.register(UserSetting, UserSettingAdmin)