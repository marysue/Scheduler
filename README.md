# Flask React Project - Placement Scheduler

Placement Scheduler is an agency/contractor placement application.  Three distinct accounts are used:  agency, contractor, company.

This automated system matches contractors with companies in need of assistance in real-time.

The contractor marks their schedules as open, the company creates their request for the type of employee they desire as well as the dates required, and the agency may view the placements made, gaining an insight into how their placements are being utilized.

Checkout the live site at:  https://placement-scheduler.herokuapp.com/

# Build to-do:

To run this application locally, you'll need to download this git repo and do the following:

1. Create a postgreSQL database user with CREATEDB role.
2. Create a postgreSQL database with owner <yourPostgreSQL db user>
3. Set your .env as shown in the ./.env.example file, modifying to use your database and owner information.
4. Set your react-app/.env as shown in the react-app/.env.example file
5. In the root directory of this project, run "pipenv install"
6. In the react-app directory, run "npm install"
7. In the root directory of this project run "pipenv shell"
   a.  Initialize your flask db by running "flask db init"
   b.  Create your database migrations by running "flask db migrate"
   c.  Now migrate your database tables to your postgreSQL db by running "flask db upgrade"
   d.  You're ready to start the app.  Run "flask run" to start your backend server
8. In the react-app directory, you're ready to start your frontend:  "npm start"

# Routes Needed

## Backend Route

1. '/company/$ {id}'

   1. POST:  Company Profile is updated with location information.
      Takes the following object and updates two tables:  company and coLocation:

      ```bash
      { companyName, addr1, addr2, city, state, zip, contactName, contactPhone }
      ```
   2. GET:  Company profile information populated in web form.
      Returns the following object from company and coLocation:

      ```
      { id, companyName, location[{ addr1, addr2, city, state, zip, contactName, contactPhone}] }
      ```
2. 'contractor/${id}'

   1. POST: Contractor Profile information is posted.
      Takes the following object and updates contractor and contrLocation tables:
      ```{contractorId, staff_type, contrLocationId_fk, contrLocation: {streetAddress1, streetAddress2, city, state, zip, contactPhone}```
   2. GET:  Populates the Contractor Profile information.
      Returns the following object from contractor and contrLocation tables::
      ```{ id, contractorName, addr1, addr2, city, state, zip, phone }```
3. 'schedule/${id}/\<dateFrom-dateTo\>;'

   1. POST:  Id in URL is companyId.  Company chooses contractor to work for them.
      Takes dateFrom-dateTo and splits on hyphen, then updates the placement table with the selected contractor id, dateFrom and dateTo rows, as well as adding the dateFrom to dateTo dates to the datesBlocked array of the contractor.
      Body of post request :
      ```{contractorId_fk}```
4. 'schedule/${id}/'

   1. GET:  Id is the Company Id.  Returns the schedule of placements made by the company:

   ```{placements: [ {id, contractorId, contractor:{ user.userName, user.email, street, companyId, startDate, endDate}
   {placements: [ {id, contractorId, contractor:{ user.userName, user.email, street, companyId, startDate, endDate}
   ```
5. 'schedule/\<user_type\>/\<dateFrom-dateTo\>'

   1. GET:  Returns all users of user type that are not blocked for any of the dates in the date range.
      ```bash
      { [user.username, user.email, contractor.id, contractor.staff_type, contrLocation: { streetAddress1, streetAddress2, city, state, zip, contactPhone }, contractor.datesBlockedArr]
      ```
6. 'schedule/'

   1. GET:  Returns ALL users placed. This is for the agency to understand when placements occur.

   ```bash
   { [placements: {company: companyName, companyLocation: { coLocation.streetAddress1, coLocation.streetAddress2, coLocation.city, coLocation.state, coLocation.zip, coLocation.contactName, coLocation.contactEmail, coLocation.contactPhone} contractor: { contractor.id, contractor.staff_type contrLocation: { contrLocation.streetAddress1, contrLocation.streetAddress2, contrLocation.city, contrLocation.state, contrLocation.zip, contrLocation.contactPhone}} ]
   ```

   ## Frontend Routes
7. '/login'
   ![Login Page](./docs/images/Login.png)
8. '/sign-up'
   ![Sign Up Page](./docs/images/SignUp.png)
9. '/companyProfile'
   ![Company Profile](./docs/images/CompanyProfile.png)
10. '/contractorProfile'
    ![Contractor Profile](./docs/images/ContractorProfile.png)
11. '/companyView'
    ![Company Calendar](./docs/images/CompanyCalendar.png)
12. '/contractorView'
    ![Contractor Calendar](./docs/images/ContractorCalendar.png)
13. '/agencyView'
    ![Agency Calendar](./docs/images/AgencyCalendar.png)

# Database Model

Database model is stored on https://dbdiagram.io/d/5fc7dbf93a78976d7b7e436b

![Database Model](./docs/images/DBModel.png)

```bash
//// -- Tables and References

Table BlockedDates as B {
  id int [pk, increment]
  contractorId_fk int [ref: > C.id]
  blocked datetime
}
Table User as U {
  id int [pk, increment]
  username varchar
  email varchar
  user_type user_type_enum
  hashed_password varchar
}

Table contractor as C {
  id int [pk, increment] // auto-increment
  userid_fk int [ref: - U.id]
  staff_type staff_type_enum
}

Table contractorContact as CL {
  id int [pk, increment]
  contractorId_fk int [ref: - C.id]
  name varchar
  phone varchar
  email varchar
  addr1 varchar
  addr2 varchar
  city varchar
  state varchar
  zip int
}

Table companyContact as OL {
  id int [pk, increment]
  company_fk int [ref: > Co.id]
  locationName varchar
  name varchar
  phone varchar
  email varchar
  addr1 varchar
  addr2 varchar
  city varchar
  state varchar
  zip int
}

Table company as Co {
  id int [pk, increment]
  userId_fk int [ref: - U.id]
  companyName varchar
}

Table placements as P {
  id int [pk, increment]
  contractorId_fk int [ref: >  C.id]
  companyId_fk int [ref: > Co.id]
  startDate datetime
  endDate datetime
}



```
