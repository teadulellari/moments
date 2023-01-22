import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from './styles'; 

const  Posts = ({ setCurrentId }) =>{
    //useSelector takes a callback function that receives the whole state of the store and must return the specific piece of state that the component needs. In this case, the callback function is (state) => state.posts, which returns the posts property from the state object.


    const posts = useSelector((state) => state.posts)
    const classes = useStyles();


    
    return (
       !posts.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}> 
                  <Post post={post}  setCurrentId={setCurrentId}/>
                </Grid>
            ))}
        </Grid>
       )
      
    )
};

export default Posts;