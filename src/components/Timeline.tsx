import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Timeline = () => {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      // const spanshot = await getDocs(tweetsQuery);

      // const tweets = spanshot.docs.map((doc) => {
      //   const { tweet, createAt, userId, username, photo } = doc.data();
      //   return {
      //     tweet,
      //     createAt,
      //     userId,
      //     username,
      //     photo,
      //     id: doc.id,
      //   };
      // });
      unsubscribe = await onSnapshot(tweetsQuery, (snaphot) => {
        const tweets = snaphot.docs.map((doc) => {
          const { tweet, createAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
};

export default Timeline;
