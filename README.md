## Monza

This project is a proof-of-concept React application based on the excellent [Rematch](https://github.com/rematch/rematch) state management library, and the [Material UI](https://github.com/mui-org/material-ui) design framework.

The premise of the application is to visualise data collected by [Kismet](https://github.com/kismetwireless/kismet), which has subsequently been parsed by my other project [kismet-kml](https://github.com/jnsgruk/kismet-kml). The application provides simple, searchable and sortable datatables, as well as detailed information on Wi-Fi access points, clients and others. It also attempts to draw an association graph indicating which clients are associated with which APs.

A key limitation at the moment is that all processing is done within the browser, there is no backend datastore. As such, if large files are uploaded then performance is likely to be poor.

To get started:

```
$ git clone https://github.com/jnsgruk/monza
$ cd monza/
$ yarn install
$ yarn start
```

You should now be able to browse to [http://localhost:3000](http://localhost:3000) and upload a JSON file outputted by [kismet-kml](https://github.com/jnsgruk/kismet-kml).
