from flask import request, jsonify
from app import app, db
from models import Application

# Get all Submitted Applications
@app.route("/api/applications", methods=["GET"])
def get_applications():
    applications = Application.query.all()
    result = [application.to_json() for application in applications]
    return jsonify(result)


# Create a Submitted Application
@app.route("/api/applications", methods=["POST"])
def create_application():
    try:
        data = request.json

        company_name = data.get("companyName")
        role = data.get("role")
        description = data.get("description")
        location = data.get("location")
        applied_date = data.get("appliedDate")
        active="Y"

        application = Application(company_name=company_name, role=role, description=description, location=location, applied_date=applied_date, active=active)
        
        db.session.add(application)
        db.session.commit()
        return jsonify({"msg": "Application saved.."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete submitted application
@app.route("/api/applications/<int:id>", methods=["DELETE"])
def delete_application(id):
    try:
        application=Application.query.get(id)
        if application is None:
            return jsonify({"msg": "Application not found."}), 404
        db.session.delete(application)
        db.session.commit()
        return jsonify({"msg": "Application deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error", str(e)}), 500
    

# Update the submitted application

@app.route("/api/applications/<int:id>", methods=["PATCH"])
def update_application(id):
    try:
        application = Application.query.get(id)
        if application is None:
            return jsonify({"msg": "Application not found."}), 404
        data = request.json

        application.role = data.get("role", application.role)
        application.description = data.get("description", application.description)
        application.location = data.get("location", application.location)
        application.applied_date = data.get("applied_date", application.applied_date)
        application.active = data.get("active", application.active)

        db.session.commit()
        return jsonify(application.to_json()), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500    


