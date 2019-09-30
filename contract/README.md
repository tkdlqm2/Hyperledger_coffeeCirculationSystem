# Hyperledger_coffeeCirculationSystem
Management system about seed info using hyperledger fabric.

# Function
There are about 10 functions for management about spec of seeds.<br>
The codes is made by Go-Lang <br>
so Let's get it.

1. enroll_seedByImporter : <br>
param 1 : stub <br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except Importers. so, enroll info about the seeds when received seeds.<br><br>

2. enroll_seedByContainer<br>
param 1 : stub <br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except Container. so, enroll info about enviroment info for management seeds.<br><br>

3. enroll_seedByCoffee<br>
param 1 : stub<br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except Coffee store. so, enroll info about Roasting Data. <br><br>

4. setarr_timeByService<br>
param 1 : stub<br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except packing store. so, enroll info about time when the items arrive. <br><br>

5. set_timeByService2<br>
param 1 : stub<br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except Coffee store. so, enroll info about time when the items arrive. <br><br>

6. set_timeByService<br>
param 1 : stub<br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except Container. so, enroll info about time when the items arrive. <br><br>

7. setarr_timeByCoffee<br>
param 1 : stub<br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except Coffeee store. so, enroll info about time when the items arrive. <br><br>

8. set_timeByImporter<br>
param 1 : stub<br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except Importer. so, enroll info about time when the items arrive. <br><br>

9. set_timeByContainer<br>
param 1 : stub<br>
param 2 : args (Datas sended at node server) <br>
function : This function can't access except Container. so, enroll info about time when the items arrive. <br><br>

9. get<br>
param 1 : stub<br>
param 2 : args (Datas sended at node server) <br>. 
function : This function can access every orgs. and can see certain seed Infos 

10. getAllKeys<br>
param 1 : stub<br>
function : This function can access every orgs. and can see all seed Infos 

