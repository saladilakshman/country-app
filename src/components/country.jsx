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
        setSpin(false);
      })
      .catch((err) => console.log(err.message));
  }, [countryname, query]);
  return (
    <Container
      sx={{
        margin: "auto",
        marginBlockend:8
      }}
    >
      {spin ? (
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          height:'100vh'
        }}>
          <CircularProgress color="primary"/>
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
          } = el;
          const refinedPopulation = new Intl.NumberFormat("en-IN").format(
            population
          );
          /**Each country object varies in their properties so getting it only values */
          const native = name.nativeName;
          const myObj = Object.values(native);
          const nativename = myObj[0].official;
          const currency = Object.values(currencies)[0].name;
          const language = Object.values(languages);
          return (
            <Stack
              key={index}
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
              <Box>
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
                    padding: 1.8,
                  }}
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="baseline"
                  >
                    <Typography variant="body1">
                      Common name : <span id="span">{name.common}</span>
                    </Typography>
                    <Typography variant="body1">
                      nativeName : <span id="span">{nativename}</span>
                    </Typography>

                    <Typography variant="body1">
                      Population : <span id="span">{refinedPopulation}</span>
                    </Typography>
                    <Typography variant="body1">
                      Sub-region : <span id="span">{subregion}</span>
                    </Typography>

                    <Typography variant="body1">
                      Capital : <span id="span">{capital}</span>
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="body1">
                      Top level domain : <span id="span">{tld}</span>
                    </Typography>
                    <Typography variant="body1">
                      Currency : <span id="span">{currency}</span>
                    </Typography>
                    <Stack direction="row">
                      <Typography variant="body1">Languages : </Typography>
                      {Array.from(language, (lang, index) => {
                        return (
                          <Typography variant="body1" key={index}>
                            <span id="span">{lang}</span>
                          </Typography>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey",
                    whiteSpace: "nowrap",
                    paddingBlockEnd: 2,
                  }}
                >
                  Border-Countries:
                </Typography>
                <Grid
                  container
                  spacing={1.2}
                  sx={{
                    width: "100%",
                  }}
                >
                  {borders.map((btn) => {
                    return (
                      <Grid item key={index} xs={6} lg={3}>
                        <Button
                          variant="contained"
                          size="small"
                          id="country-name"
                          sx={{
                            fontSize: 12,
                            backgroundColor: "#d76c6e",
                            "&:hover": {
                              backgroundColor: "#d76c6e",
                            },
                          }}
                          fullWidth
                          onClick={(event) =>
                            setQuery(event.currentTarget.textContent)
                          }
                        >
                          {countries[btn].name}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Stack>
          );
        })
      )}
    </Container>
  );
};
export default Country;
