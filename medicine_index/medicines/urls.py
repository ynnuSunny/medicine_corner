from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MedicineListCreateView, MedicineDetailView, MedicineUpdateDeleteView, MedicineSearchView

urlpatterns = [
    path('medicines/', MedicineListCreateView.as_view(), name='medicine-list-create'),
    path('medicines/<int:pk>/', MedicineDetailView.as_view(), name='medicine-detail'),
    path('medicines/<int:pk>/edit/', MedicineUpdateDeleteView.as_view(), name='medicine-update-delete'),
    path('search/', MedicineSearchView.as_view(), name='medicine-search'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
