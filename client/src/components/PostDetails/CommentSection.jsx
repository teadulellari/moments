import React, { useState, useRef} from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";


import useStyles from './styles';
import { commentPost } from '../../actions/posts'


const CommentSection =({ post }) => {
    console.log( "this is the post" +post);
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
   // console.log("this is  my post. com" +post?.comments)
    const [comment, setComment ] = useState('');
    const user = useSelector((state) => state?.auth?.authData);
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleClick= async () => {
        const finalComment = `${user?.name}: ${comment}`;
        console.log(finalComment);
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });

    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>

                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1" >
                            <strong>{c.split(': ')[0]}:</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.name  && (
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField 
                    fullWidth
                    minRows={4}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment.length} variant="contained" color="primary" onClick={handleClick}>
                     Comment
                    </Button>
                </div>
                )}

            </div>

        </div>
       
    );
}


export default CommentSection;