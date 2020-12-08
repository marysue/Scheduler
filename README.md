# Flask React Project - Placement Scheduler

Placement Scheduler is an agency/contractor placement application.  Three distinct accounts are used:  agency, contractor, company.

This automated system matches contractors with companies in need of assistance in real-time.

The contractor marks their schedules as open, the company creates their request for the type of employee they desire as well as the dates required, and the agency may view the placements made, gaining an insight into how their placements are being utilized.


# Routes Needed

## Backend Route'/company/$ {id}'

1. 1. POST:  Takes the following object:
      ```{ id, companyName, addr1, addr2, city, state, zip, contactName, contactPhone }```
   2. GET:  Returns the following object:

      ```
      { id, companyName, location[{ addr1, addr2, city, state, zip, contactName, contactPhone}] }
      ```
      2. 'contractor/${id}'
         1. POST: Takes the following object:
            ```{id, contractorType, addr1, addr2, city, state, zip, phone}```
         2. GET:  Returns the following object:
            ```{ id, contractorName, addr1, addr2, city, state, zip, phone }```
      3. 'company/id/schedule'
         1. POST:  Takes the following object:
            ```{id, startDate, endDate, contractorId}```
         2. GET:  Returns the following object:
            ```{placements: [ {id, contractorId, contractor:{ user.userName, user.email, street, companyId, startDate, endDate}

            ```
