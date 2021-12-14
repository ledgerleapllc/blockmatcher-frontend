<p align="center">
	<img src="https://blockmatcher.ledgerleap.com/logo.png" width="400">
</p>


## BlockMatcher Frontend

For those interested in buying/selling CSPR OTC. This system allows the creation of OTC token deals, matching buyers and sellers together. The admin, or broker, can then clear them in batches. Buyers come register and place their offers for what they are willing to pay. Sellers come register and place their tokens up for sale at a price they believe is fair. The admin matches buyers and sellers and batches them together for each era that there are sales to be brokered. 

This is the frontend repo of the portal. To see the backend repo, visit https://github.com/ledgerleapllc/blockmatcher-backend

### Prerequisites

Relies on NextJS/Vercel, and NodeJS version 14+

You can find documentation on NextJS here https://github.com/vercel/next.js/

You can find documentation on NodeJS here https://github.com/nodejs/help

### Install and Deploy

First we need a server to use. Apache/Nginx

```bash
sudo apt -y install apache2
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo apt-get update
```

Setup the repo according to our VHOST path. Note, the actual VHOST path in this case should be set to **/var/www/blockmatcher-frontend/out**

```bash
cd /var/www/
git clone https://github.com/ledgerleapllc/blockmatcher-frontend
cd blockmatcher-frontend
```

You will need to add the following code to your server configuration under the VHOST path.

```
RewriteEngine On
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
```

Install packages and setup environment. You will need to modify **.env.production** variables to fit the server on which you're deploying.

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install nodejs -y
npm install
npm run build-export
```

The above commands will build **out/** on site using the variables from your .env.production file.

### Usage Guide

For full functionality we recommend adding API keys to support the feature of live CSPR prices.

**Start here -**

After deployment of the portal, log in with the admin code. The first thing to be seen are three tables, sale offers, purchase offers, and batching details. This is where an admin can visually match buyers and sellers, and in turn create a new batch request to process them together. You can register new accounts as a buyer and a seller to test placing OTC orders, which will in turn appear on the admin's tables.

**Other notes -**

These features were scoped and determined to be the essential features needed for BlockMatcher. Email any questions to team@ledgerleap.com.

### Testing

We use Cypress for testing the portal's critical functionality. In order to run the test suite, you will need to copy the example cypress.example.json to cypress.json and enter your variables. Then after a successful build, **npm run cypress-run** for a headless unit test, or **npm run cypress-open** for a more detailed test interface.

```bash
cp cypress.example.json cypress.json
npm run cypress-run
```
