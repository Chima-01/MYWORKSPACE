import { PollFormInputs } from "../auth/authSchema";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { durationMap } from "../hooks/createPollHooks";


type SetPollSaveStatus = (status: boolean) => void;


export const handlePollSubmit = async (poll: PollFormInputs, setPollSaveStatus: SetPollSaveStatus ) => {
  const now = Date.now();
  const selectedTimeMs = new Date(poll.startTime).getTime();
  const durationMS = durationMap[poll.duration as keyof typeof durationMap] || 0;
  let pollStartTime = poll.startTime;

  if (selectedTimeMs < now + 60000) {
    pollStartTime = new Date(now + 60000).toISOString();
    setPollSaveStatus(true);
  }

  const supabase = await createClient();
  const { data: { user } }= await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "NO_USER"
    }
  }

    const pollData = {
      user_id: user.id,
      title: poll.title,
      description: poll.description,
      question_type: poll.questionType,
      options: poll.options,
      anonymous: poll.anonymous ?? false,
      start_time: pollStartTime,
      expires_at: (new Date(pollStartTime).getTime() + durationMS),
    }
  const { data, error } = await supabase.from("polls").insert([pollData]).select();

  if (error) {
    console.log("Error: ", error.message)
    return {
      success: false,
      error: error.message
    };
  } 

  toast.success("Poll created successfully!");
  console.log("Created poll:", data);
  return { success: true, message: "Poll has been recorded successfully", data };

}


export type DurationKey = {
  "1m": number
  "5m": number,
  "10m": number,
  "30m": number,
  "1h": number,
  "6h": number,
  "12h": number,
  "1d": number,
}