"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "./button";
import {
  decrement,
  increment,
  resetValue,
} from "@/features/countSlice/countSlice";
export default function ButtonComponent() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((value) => value.count.value);
  return (
    <div>
      <div>Count: {count}</div>
      <Button onClick={() => dispatch(increment())}> Increment </Button>
      <Button onClick={() => dispatch(decrement())}> Decrement </Button>
      <Button onClick={() => dispatch(resetValue())}> Reset </Button>
    </div>
  );
}
