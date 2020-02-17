import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listEntrys } from "./api";
import LogEntryForm from "./LogEntryForm";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 500
  },
  media: {
    width: 400,
    height: 250,
    backgroundSize: "cover"
  }
});

const App = () => {
  const classes = useStyles();
  const [logEntrys, setLogEntrys] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addLocation, setAddLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 16.0903087,
    longitude: 108.2181724,
    zoom: 5
  });

  useEffect(() => {
    (async () => {
      const entrys = await listEntrys();
      setLogEntrys(entrys);
    })();
  }, []);

  const showAddMarkerPop = e => {
    const [longitude, latitude] = e.lngLat;
    setAddLocation({
      longitude,
      latitude
    });
  };

  const loadEntrys = data => {
    setLogEntrys([...logEntrys, data]);
    console.log(logEntrys);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/duyhuydn1/ck6n1vuw004lp1imv01kqrjv9"
      mapboxApiAccessToken="pk.eyJ1IjoiZHV5aHV5ZG4xIiwiYSI6ImNrNm4xaWF5YTB3MnIzbm5xcW4yamd4bDUifQ.df0fc4qu1StZ12RG8IWJtw"
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPop}
    >
      {logEntrys.map(e => (
        <Fragment key={e._id}>
          <Marker
            latitude={e.latitude}
            longitude={e.longitude}
            offsetLeft={-20}
            offsetTop={-30}
          >
            <svg
              style={{
                cursor: "pointer"
              }}
              viewBox="0 0 24 24"
              width="40"
              height="40"
              color="#3498db"
              stroke="currentColor"
              strokeWidth="2"
              fill="#3498db"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() =>
                setShowPopup({
                  [e._id]: true
                })
              }
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle
                cx="12"
                cy="10"
                r="3"
                color="#bdc3c7"
                fill="#bdc3c7"
              ></circle>
            </svg>
          </Marker>
          {showPopup[e._id] ? (
            <Popup
              className="abc"
              latitude={e.latitude}
              longitude={e.longitude}
              closeButton={true}
              closeOnClick={false}
              anchor="top"
              dynamicPosition={true}
              onClose={() =>
                setShowPopup({
                  ...showPopup,
                  [e._id]: false
                })
              }
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={e.image}
                    title={e.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {e.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {e.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Popup>
          ) : null}
        </Fragment>
      ))}
      {addLocation ? (
        <>
          <Marker
            latitude={addLocation.latitude}
            longitude={addLocation.longitude}
            offsetLeft={-20}
            offsetTop={-30}
          >
            <svg
              style={{
                cursor: "pointer"
              }}
              viewBox="0 0 24 24"
              width="40"
              height="40"
              color="#e74c3c"
              stroke="currentColor"
              strokeWidth="2"
              fill="#e74c3c"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle
                cx="12"
                cy="10"
                r="3"
                color="#bdc3c7"
                fill="#bdc3c7"
              ></circle>
            </svg>
          </Marker>
          <Popup
            className="abc"
            latitude={addLocation.latitude}
            longitude={addLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            dynamicPosition={true}
            onClose={() => setAddLocation(null)}
          >
            <LogEntryForm
              onClose={() => setAddLocation(null)}
              loadEntrys={loadEntrys}
              addLocation={addLocation}
            />
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
