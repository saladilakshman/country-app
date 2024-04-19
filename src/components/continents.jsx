import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Stack,
  Box,
  IconButton,
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
  Skeleton,
  Paper,
  List,
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext, useEffect, useState } from "react";
import { APP_DATA } from "../App";
import SearchIcon from "@mui/icons-material/Search";
import Africa from "../assets/contients images/Africa.jpg";
import America from "../assets/contients images/America.jpg";
import Asia from "../assets/contients images/Asia.jpg";
import oceania from "../assets/contients images/oceania.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../App.css";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import Europe from "../assets/contients images/europe.jpg";
import axios from "axios";
import Search from "./search";
const Continents = () => {
  const { state, dispatch, mobile_layout } = useContext(APP_DATA);
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(true);
  const [istyping, setIstyping] = useState(false);
  const continentsInfo = [
    {
      src: Africa,
      fact: "Africa is the Second-largest continent, diverse cultures.",
    },
    {
      src: Asia,
      fact: "Asia is the Largest continent, with diverse cultures and landscapes.",
    },
    {
      src: America,
      fact: "America is famous for Amazon Rainforest, Andes, Great plains.",
    },
    {
      src: Europe,
      fact: "Europe has rich history, diverse languages, iconic landmarks.",
    },
    {
      src: oceania,
      fact: "Ocanian is known for Unique wildlife, Great Barrier Reef",
    },
  ];
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  /**applyinh horizontal scroll functionality to the images */
  const horizontalscroll = (pixels) => {
    const items = document.querySelector(".scroll-items-list");
    items.scrollBy({
      top: 0,
      left: pixels,
      behavior: "smooth",
    });
  };

  /**fetching all the continents data using RESTAPI */
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        dispatch({ type: "continents-data", payload: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsloading(false))
  }, [dispatch]);

  /**displaying each continent countries details based on continent using filter */
  const eachcontinentsdata = (regionname) =>
    state.continentsdata.filter((continent) => continent.region === regionname);

  /**providing let and right scroll functionality for the cards */
  const scroll_country_cards = (indexposition, pixelvalue) => {
    const country_cards = document.querySelectorAll(".stack-elements");
    country_cards[indexposition].scrollBy({
      top: 0,
      left: pixelvalue,
      behavior: "smooth",
    });
  };

  return (
    <>
      <AppBar position="fixed" color="info">
        <Toolbar>
          <Typography variant={mobile_layout ? "body1" : "h6"}>
            Where in the world?
          </Typography>
          {mobile_layout ? (
            ""
          ) : (
            <Box
              sx={{
                position: "relative",
                margin: "auto",
                display: "block",
              }}
            >
              {istyping && (
                <Paper
                  sx={{
                    position: "absolute",
                    left: 120,
                    width: 370,
                    maxHeight: 200,
                    overflow: "auto",
                    top: 40,
                  }}
                >
                  {state.list?.map((country, index) => {
                    const { name, flags, region } = country;
                    return (
                      <List
                        key={index}
                        onClick={() =>
                          document.startViewTransition(() =>
                            navigate(`/${name.official}`)
                          )
                        }
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={flags.png} alt="" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={name.official}
                            secondary={region}
                          />
                        </ListItem>
                        <Divider />
                      </List>
                    );
                  })}
                </Paper>
              )}
              <Box
                component="input"
                type="search"
                sx={{
                  marginLeft: "30%",
                  width: 380,
                  height: 32,
                  borderRadius: 4,
                  outline: "none",
                  border: "none",
                  paddingLeft: 2,
                }}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setIstyping(false);
                  } else {
                    dispatch({
                      type: "search-countries",
                      payload: e.target.value,
                    });
                    setIstyping(true);
                  }
                }}
                placeholder="Search country"
              />
            </Box>
          )}

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              marginLeft: "auto",
            }}
          >
            {mobile_layout && (
              <IconButton
                aria-label=""
                color="inherit"
                onClick={() => dispatch({ type: "open-dialog-box" })}
              >
                <SearchIcon />
              </IconButton>
            )}
            <Typography variant="body2" color="inherit">
              {state.darkmode ? <DarkModeIcon /> : <LightModeIcon />}
            </Typography>
            <Switch
              value=""
              checked={state.isChecked}
              onChange={() => dispatch({ type: "switch-mode" })}
              size={mobile_layout ? "small" : "medium"}
            />
          </Stack>
        </Toolbar>
      </AppBar>

      <div
        style={{
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          justifyContent={"flex-start"}
          alignItems="center"
          spacing={1}
          sx={{
            marginBlockStart: 10,
            overflow: mobile_layout ? "scroll" : "hidden",
          }}
          className="scroll-items-list"
        >
          {Array.from(continentsInfo, (continentInfo, index) => {
            return (
              <Box
                key={index}
                className="lazy-image"
                sx={{
                  position: "relative",
                  padding: 0.8,
                  width: "100%",
                }}
              >
                <LazyLoadImage
                  id="image"
                  alt=""
                  src={continentInfo.src}
                  style={{
                    borderRadius: "0.2rem",
                    width: mobile_layout ? "20rem" : "35rem",
                    height: "100%",
                    aspectRatio: 3 / 2,
                    objectFit: "cover",
                    borderImage: "fill 0 linear-gradient(#0001,#000)",
                  }}
                />
                <Typography
                  variant={mobile_layout ? "body2" : "h6"}
                  color="inherit"
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    color: "white",
                    paddingLeft: 0.2,
                    width: "100%",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      background: "linear-gradient(#0001,#000)",
                      bottom: 2,
                    },
                  }}
                >
                  {continentInfo.fact}
                </Typography>
              </Box>
            );
          })}
          {!mobile_layout && (
            <>
              <IconButton
                sx={{
                  position: "absolute",
                  backgroundColor: "white",
                  left: 5,
                  color: "black",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
                onClick={() => horizontalscroll(-800)}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                sx={{
                  position: "absolute",
                  backgroundColor: "white",
                  color: "black",
                  right: 5,
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
                onClick={() => horizontalscroll(800)}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}
        </Stack>
      </div>

      <Box
        sx={{
          margin: 1,
        }}
      >
        {Array.from(regions, (region, index) => {
          return (
            <Box
              key={index}
              sx={{
                p: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems="center"
                sx={{
                  marginBlockEnd: 2,
                }}
              >
                <Typography variant="h6" color="inherit">
                  {region} Countries ({eachcontinentsdata(region).length})
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  {!mobile_layout && (
                    <>
                      <IconButton
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={() => scroll_country_cards(index, -500)}
                      >
                        <WestIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={() => scroll_country_cards(index, 500)}
                      >
                        <EastIcon />
                      </IconButton>
                    </>
                  )}
                </Stack>
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1.2}
                sx={{
                  p: 0.5,
                  overflow: mobile_layout ? "scroll" : "hidden",
                }}
                className="stack-elements"
              >
                {eachcontinentsdata(region).map((data, index) => {
                  const { name, capital, region, population, flags } = data;
                  const formatedPopulationNumber = new Intl.NumberFormat(
                    "en-IN"
                  ).format(population);
                  return (
                    <Box key={index}>
                      {isloading ? (
                        <Card>
                          <Skeleton
                            variant="rectangle"
                            width={280}
                            height={290}
                          />
                        </Card>
                      ) : (
                        <CardActionArea
                          onClick={() => {
                            document.startViewTransition(() =>
                              navigate(`/${name.official}`)
                            );
                          }}
                        >
                          <Card
                            sx={{
                              width: mobile_layout ? "100%" : 300,
                              minHeight: 320,
                            }}
                          >
                            <CardMedia
                              title=""
                              image={flags.png}
                              component="img"
                              sx={{
                                height: 145,
                              }}
                            />
                            <CardContent>
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center", width: "100%" }}
                                id="country-name"
                                title={name.official}
                              >
                                {name.official}
                              </Typography>
                              <table
                                style={{
                                  margin: "auto",
                                  fontFamily: "helvetica",
                                  paddingBlockStart: 3,
                                  fontSize: '1.2rem'
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td style={{ whiteSpace: "nowrap" }}>
                                      Common name
                                    </td>
                                    <td>:</td>
                                    <td></td>
                                    <td id="country-name">{name.common}</td>
                                  </tr>
                                  <tr>
                                    <td>Population</td>
                                    <td>:</td>
                                    <td></td>
                                    <td>{formatedPopulationNumber}</td>
                                  </tr>
                                  <tr>
                                    <td>Region</td>
                                    <td>:</td>
                                    <td></td>
                                    <td>{region}</td>
                                  </tr>
                                  <tr>
                                    <td>Capital</td>
                                    <td>:</td>
                                    <td></td>
                                    <td id="country-name" title={capital}>
                                      {capital}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </CardContent>
                          </Card>
                        </CardActionArea>
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          );
        })}
      </Box>
      <Search />
    </>
  );
};
export default Continents;
