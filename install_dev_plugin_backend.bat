::Skripta koja prvo postavi instalaciju za backend zatim instalira sve django plugina pa inicijalizuje klijentsku aplikaciju
cd ./VersionControl&& py -m venv env&& env\Scripts\activate.bat&& pip install django&& pip install djangorestframework&& pip install django-cors-headers&& pip install PyJWT&& cd ../Public&& npm install&& npm install -g @angular/cli&& cd ..