FROM ubuntu:16.04
MAINTAINER Dave <davesade42@gmail.com>
RUN yum install httpd -y
RUN chkconfig httpd on
COPY boxes.js /var/www/html
COPY engine.js /var/www/html
COPY index.html /var/www/html
COPY microgame.iml /var/www/html
COPY newton.js /var/www/html
COPY README.md /var/www/html
COPY style.css /var/www/html



EXPOSE 80