import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

const useStyles = makeStyles(styles);

export default function ExtendedTables() {
  const classes = useStyles();
  const roundButtons = [
    { color: "info", icon: Person },
    { color: "success", icon: Edit },
    { color: "danger", icon: Close }
  ].map((prop, key) => {
    return (
      <Button
        round
        color={prop.color}
        className={classes.actionButton + " " + classes.actionButtonRound}
        key={key}
      >
        <prop.icon className={classes.icon} />
      </Button>
    );
  });
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="warning" icon>
            <CardIcon color="success">
              <Assignment />
            </CardIcon>
          </CardHeader>
          <CardBody>
            <Table
              tableHead={["#", "Title", "Type", "Artist", "Price"]}
              tableData={[
                [
                  "1",
                  "Selfie in Lisbon",
                  "Trending",
                  "Li Wan",
                  "€100",
                  roundButtons
                ],
                [
                  "2",
                  "Selfie in Lisbon",
                  "Trending",
                  "Li Wan",
                  "€100",
                  roundButtons
                ],
                [
                  "3",
                  "Selfie in Lisbon",
                  "Trending",
                  "Li Wan",
                  "€100",
                  roundButtons
                ],
                [
                  "4",
                  "Selfie in Lisbon",
                  "Trending",
                  "Li Wan",
                  "€100",
                  roundButtons
                ],
                [
                  "5",
                  "Selfie in Lisbon",
                  "Trending",
                  "Li Wan",
                  "€100",
                  roundButtons
                ]
              ]}
              customCellClasses={[classes.center, classes.right, classes.right]}
              customClassesForCells={[0, 4, 5]}
              customHeadCellClasses={[
                classes.center,
                classes.right,
                classes.right
              ]}
              customHeadClassesForCells={[0, 4, 5]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
