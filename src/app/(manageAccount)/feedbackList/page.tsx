import React  from "react";
import FeedbackList from "./FeedbackList";
import { DreviewItems } from "@/app/fakedb";

const Page = () => {
  const reviewItem = DreviewItems || [];

  return (
    <FeedbackList reviewItem={reviewItem} />
  );
};

export default Page;
