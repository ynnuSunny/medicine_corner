from django.db import models

class Medicine(models.Model):
    name = models.CharField(max_length=100)
    generic_name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    batch_number = models.CharField(max_length=50)
    location = models.CharField(max_length=255)  # Location field
    other_details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
