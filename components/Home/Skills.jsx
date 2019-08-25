import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import styles from '../../styles/components/home'

const useStyles = makeStyles(styles)

export default function Skills ({ skills }) {
  const classes = useStyles()

  return (
    <Grid
      container
      className={classes.skillsContainer}
    >
      {skills.map(skill => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={skill.title}
          className={classes.skill}
          data-aos='fade-in'
        >
          <Paper className={classes.skillBoxContainer}>
            <i
              className={classNames(
                `de-icons icon-${skill.icon}`,
                classes.iconSkill
              )}
            />
            <div className={classes.titleSkill}>{skill.title}</div>
            <Typography className={classes.contentSkill}>
              {skill.content}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string
    })
  )
}