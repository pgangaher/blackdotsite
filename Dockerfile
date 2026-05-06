FROM nginx:alpine

# Remove default nginx config and content
RUN rm -rf /usr/share/nginx/html/* \
           /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static site files
COPY index.html  /usr/share/nginx/html/
COPY css/        /usr/share/nginx/html/css/
COPY js/         /usr/share/nginx/html/js/
COPY assets/     /usr/share/nginx/html/assets/
COPY services/   /usr/share/nginx/html/services/

EXPOSE 80
