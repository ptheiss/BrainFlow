from django.test import TestCase
from rest_framework.test import APIRequestFactory
from api.views import NoteViewSet

# Create your tests here.
class brainFlowTestCase (TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.post_data = {
            'title': 'test_123',
            'content': 'Test!!',
            'tags': [],
            'group': '',
        }
        self.put_data = {
            'title': 'test_456',
            'content': 'Put Test!!',
            'tags': [],
            'group': '',
        }
        pass

    def test_db_requests(self):
        self.post_request()
        self.get_request()
        self.put_request()
        self.delete_request()

    def post_request(self):
        request = self.factory.post('/api/notes/', self.post_data, format='json')
        view = NoteViewSet.as_view(actions={'post':'create'})
        
        response = view(request)
        self.assertEqual(response.status_code, 201)
        pass

    def get_request(self):
        request = self.factory.get('/api/notes/')
        view = NoteViewSet.as_view(actions={'get':'retrieve'})
        
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200)
        pass

    def put_request(self):
        request = self.factory.put('/api/notes/', self.put_data, format='json')
        view = NoteViewSet.as_view(actions={'put':'update'})
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200)
        pass

    def delete_request(self):
        request = self.factory.delete('/api/notes/')
        view = NoteViewSet.as_view(actions={'delete':'destroy'})
        response = view(request, pk=1)

        self.assertEqual(response.status_code, 204)
        pass