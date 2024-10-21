# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy your HTML files to the default directory used by Nginx to serve content
COPY . /usr/share/nginx/html

# Expose port 80 to access the web server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
