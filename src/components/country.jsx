import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { APP_DATA } from "../App";
import { countries } from "country-data";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../App.css";
const Country = () => {
  const { countryname } = useParams();
  const { mobile_layout } = useContext(APP_DATA);
  const [countryinfo, setCountryinfo] = useState([]);
  const [query, setQuery] = useState(countryname);
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${query}`)
      .then((res) => {
        setCountryinfo(res.data);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setSpin(false))
  }, [countryname, query]);
  const TextIntl = (info) => {
    return new Intl.ListFormat('en-IN', { style: 'long', type: 'conjunction' }).format(info)
  }

  return (
    <Container
      sx={{
        margin: "auto",
        marginBlockend: 8,
      }}
    >
      {spin ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        countryinfo?.map((el, index) => {
          const {
            flags,
            name,
            population,
            subregion,
            capital,
            tld,
            currencies,
            languages,
            borders,
            capitalInfo
          } = el;
          const refinedPopulation = new Intl.NumberFormat("en-IN").format(
            population
          );
          /**Each country object varies in their properties so getting it only values */
          const native = name?.nativeName;
          const myObj = Object.values(native);
          const nativename = myObj[0].official;
          const currency = Object.values(currencies)[0].name;
          const language = Object.values(languages);
          return (
            <Box key={index}>
              <Stack
                direction={mobile_layout ? "column" : "row"}
                justifyContent="center"
                alignItems="center"
                spacing={8}
                sx={{
                  marginBlockStart: mobile_layout ? 8 : 18,
                }}
              >
                <Box
                  component="img"
                  alt=""
                  src={flags.png}
                  sx={{
                    boxShadow: 4,
                  }}
                />
                <Box key={index}>
                  <Typography
                    variant={mobile_layout ? "h6" : "h3"}
                    textAlign="center"
                    sx={{
                      marginBlockEnd: 2,
                    }}
                  >
                    {name.official}
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: mobile_layout
                        ? "repeat(1,1fr)"
                        : "repeat(2,1fr)",
                      placeItems: "baseline",
                      gap: 4,
                      padding: 1.2,
                      paddingBlockEnd: 5,
                    }}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="baseline"
                      sx={{
                        margin: mobile_layout ? "auto" : "",
                        width: "100%",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="baseline"
                      >
                        <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                          Common name:
                        </Typography>
                        <Typography variant="h6" id="span">
                          {name.common}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="baseline"
                      >
                        <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                          Nativename:
                        </Typography>
                        <Typography variant="h6" id="span">
                          {nativename}
                        </Typography>
                      </Stack>

                      <Typography variant="h6">
                        Population : <span id="span">{refinedPopulation}</span>
                      </Typography>
                      <Typography variant="h6">
                        Sub-region : <span id="span">{subregion ?? "-"}</span>
                      </Typography>

                      <Typography variant="h6">
                        Capital : <span id="span">{capital}</span>
                      </Typography>
                    </Stack>

                    <Stack>
                      <Typography variant="h6">
                        Top level domain : <span id="span">{tld}</span>
                      </Typography>
                      <Typography variant="h6">
                        Currency : <span id="span">{Array.isArray(currency) ? TextIntl(currency) : currency}</span>
                      </Typography>
                      <Stack direction="row">
                        <Typography variant="h6">
                          Languages :<span id="span">{TextIntl(language)}</span>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="baseline"
                    spacing={2}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "##414141",
                        whiteSpace: "nowrap",
                        paddingBlockEnd: 2,
                      }}
                    >
                      Border-Countries:
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                      sx={{
                        gap: 2,
                        flexWrap: "wrap",
                        paddingBlockEnd: 2,
                      }}
                    >
                      {borders?.map((btn) => {
                        return (
                          <div key={index}>
                            <Button
                              fullWidth
                              variant="contained"
                              size="small"
                              id="btn"
                              sx={{
                                fontSize: 12,
                                minWidth: "100%",
                                backgroundColor: "#d76c6e",
                                "&:hover": {
                                  backgroundColor: "#d76c6e",
                                },
                              }}
                              onClick={(event) =>
                                setQuery(event.currentTarget.textContent)
                              }
                            >
                              {countries[btn].name}
                            </Button>
                          </div>
                        );
                      }) ?? <Typography variant="body1">This is island country.</Typography>
                      }
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <MapContainer center={[capitalInfo.latlng[0], capitalInfo.latlng[1]]} zoom={6} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[capitalInfo.latlng[0], capitalInfo.latlng[1]]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>

                </Marker>
              </MapContainer>
            </Box>
          );
        })
      )}
    </Container>
  );
};
export default Country;
