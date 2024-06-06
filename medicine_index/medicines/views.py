from rest_framework import generics
from .models import Medicine
from .serializers import MedicineSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, AllowAny
from django.db.models import Q

class MedicineListCreateView(generics.ListCreateAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class MedicineDetailView(generics.RetrieveAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class MedicineUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    permission_classes = [IsAdminUser]

class MedicineSearchView(generics.ListAPIView):
    serializer_class = MedicineSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Medicine.objects.all()
        query = self.request.query_params.get('q', None)
        if query is not None:
            queryset = queryset.filter(
                Q(name__icontains=query) | Q(generic_name__icontains=query)
            )
        return queryset
