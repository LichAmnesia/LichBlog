---
title: Deploying and Running Your Application on Google Cloud Run
toc: true
date: 2024-01-28 09:20:32
tags:
 - Google Cloud Run
 - Google
 - Docker
---

Deploying and running applications on the cloud has become a fundamental skill for developers. Google Cloud Run offers a fully managed platform to deploy and scale your applications quickly. In this blog, we will walk through the process of deploying an application on Cloud Run using Docker and Google Artifact Registry.

![](https://storage.googleapis.com/lichamnesia.appspot.com/images/cloudrun1.png)

<!-- more -->

## **Local Docker Setup**
Before pushing to google cloud, better to test on your local docker.

### **Step 1: Building a Docker Image**

1. **Open Terminal**: Navigate to the directory containing your **`Dockerfile`** and application code.
2. **Build Image**: Use the **`docker build`** command to create a Docker image. Specify a tag for the image, like **`myapp:latest`**.
    
    ```bash
    docker build -t myapp:latest .
    ```
    
**`myapp:latest`** signifies the name and tag of your image, while **`.`** represents the current directory.
    

### **Step 2: Running Docker Container**

1. **Run Container**: Execute the built image using the **`docker run`** command.
    
    ```bash
    docker run -p 9090:8080 --name mycontainer myapp:latest
    ```
    
Here, **`-p 9090:8080`** maps port 8080 of the container to port 9090 of your host machine. **`--name mycontainer`** sets the container's name.
    

Your Docker container should now be running locally and accessible via **`localhost:9090`**.

### **Considerations**

- Ensure the port mapping meets your application's needs.
- Check your Dockerfile and application code if you encounter errors during build or run.
- Use **`docker logs mycontainer`** to view container logs for troubleshooting.
- Rebuild the image if you make changes to your application code or Dockerfile.

## **Artifact Registry**

### **Step 1: Enabling Artifact Registry API**

Ensure the Artifact Registry API is enabled in your Google Cloud Console.

### **Step 2: Creating an Artifact Registry Repository**

1. Navigate to Artifact Registry in Google Cloud Console.
2. Click "Create Repository".
3. Select "Docker" as the repository type.
4. Provide a name, select a region, and set necessary configurations.
5. Click "Create".

### **Step 3: Configuring Docker Authentication**

Configure Docker on your local machine to use the newly created Artifact Registry repository:

```bash
gcloud auth configure-docker [REGION]-docker.pkg.dev
```

Replace **`[REGION]`** with your repository's region.

### **Step 4: Building Container Image**

Build the Docker image and tag it for the Artifact Registry repository path:

```bash
docker build -t [REGION]-docker.pkg.dev/[YOUR_PROJECT_ID]/[REPOSITORY_NAME]/[IMAGE_NAME]:[TAG] .

```

Replace **`[REGION]`**, **`[YOUR_PROJECT_ID]`**, **`[REPOSITORY_NAME]`**, **`[IMAGE_NAME]`**, and **`[TAG]`**.

### **Step 5: Pushing Image to Artifact Registry**

Push the built image to your Artifact Registry repository:

```bash
docker push [REGION]-docker.pkg.dev/[YOUR_PROJECT_ID]/[REPOSITORY_NAME]/[IMAGE_NAME]:[TAG]

```

### **Step 6: Deploying Container on Cloud Run**

Deploy the container to Cloud Run using the following command:

```bash
gcloud run deploy [SERVICE_NAME] \
  --image [REGION]-docker.pkg.dev/[YOUR_PROJECT_ID]/[REPOSITORY_NAME]/[IMAGE_NAME]:[TAG] \
  --platform managed \
  --region [CLOUD_RUN_REGION] \
  --allow-unauthenticated \
  --memory 1Gi --concurrency 1
```

Replace **`[SERVICE_NAME]`** and **`[CLOUD_RUN_REGION]`**.

### **Considerations**

- Ensure the region matches between Cloud Run and Artifact Registry.
- Be aware of potential extra data transfer costs if regions differ.
- Confirm IAM permissions for Artifact Registry access before deploying.
- Adjust memory and CPU settings in Cloud Run service configuration as needed. 
- Adjust concurrency if you can only allow 1-2 requests at one time

### **Health Checks**

Consider adding a health check route in **`app.js`** if your application offers HTTP services:

```jsx
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

```

Ensure all files are included in your Docker image build.

### **`package.json`**

Your **`package.json`** should include dependencies for running on Cloud Run. The **`"main": "app.js"`** specifies the entry file of your application. 

Setup `npm start` command and also setup in `Dockerfile`
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
},
```

### **`Dockerfile`**

1. **Node.js Base Image**: Using **`node:16-slim`** as a base image is a good choice for its lightweight yet functional environment.
2. **Install Chrome**: Your Dockerfile includes steps to install Google Chrome, essential for Puppeteer.
3. **Install Dependencies**: Application npm dependencies are correctly installed.
4. **Copy Application Code**: Application code is copied into the container.
5. **Port and Environment Variables**: Port 8080 is exposed with the appropriate environment variables set.
6. **Start Command**: **`CMD ["npm", "start"]`** runs your application upon container start. Ensure **`app.js`** includes the logic to start your application, like an HTTP server.

### **Validating `app.js`**

Make sure **`app.js`** is suitable for running on Cloud Run, particularly in terms of starting an HTTP server and listening on the designated port.

Make sure `express` is installed for running a web application.

### **Building and Deploying**

Test your application in a local Docker environment before deploying to Google Cloud Run. This helps to identify and resolve potential issues.

## Run puppeteer in Cloud Run

Instance has to be more than 1Gi and cocurrency to be 1.

### `package.json`
```json
"dependencies": {
 "@sparticuz/chromium": "^119.0.2",
 "express": "^4.18.2",
 "puppeteer-core": "^21.9.0"
}
```

### `Dockerfile`

```dockerfile
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb || apt-get install -fy
```

### puppeteer setting

```javascript
browser = await puppeteer.launch({
   args: ['--disable-dev-shm-usage',
       '--disable-accelerated-2d-canvas',
       '--no-first-run',
       '--no-zygote',
       '--single-process', 
       '--disable-gpu',
       '--no-sandbox',
       '--disable-setuid-sandbox'],
   executablePath: '/usr/bin/google-chrome-stable', 
   headless: true,
   timeout: 10000, 
});
```


---

Since we are friends, you are welcome to use my text, but please credit the source: https://alwa.info