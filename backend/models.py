from app import db

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(15), nullable=False)
    applied_date = db.Column(db.String(10), nullable=False)
    active = db.Column(db.String(1), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "companyName": self.company_name,
            "role" : self.role,
            "description": self.description,
            "location": self.location,
            "appliedDate": self.applied_date,
            "active": self.active
        }
    
    
