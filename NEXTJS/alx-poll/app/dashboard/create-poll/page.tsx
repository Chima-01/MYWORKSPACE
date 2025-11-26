"use client";
// import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useActionState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initialPollState, usePoll } from "@/features/hooks/createPollHooks";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import{ handlePollSubmit } from "@/features/createPollFeatures/createPollSubmit";
import { durationMap } from "@/features/hooks/createPollHooks";

import { Switch } from "@/components/ui/switch";
import { FaTrash, FaPlus, FaCheck, FaEdit } from "react-icons/fa";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import handleCreatePollAuth from "@/features/createPollFeatures/createPollAuth";

const CreatePollpage = () => {
  const [state, action, pending] = useActionState(handleCreatePollAuth, undefined);
  const {
    poll,
    setPoll,
    addOption,
    removeOption,
    handleOptionChange,
    toggleOptionsEdit,
    setQuestionType,
    setStartTime,
    setDuration,
    setOpenCharLimit,
    setMin,
    setMax,
    setTitle,
    setDescription
  } = usePoll(initialPollState);
  // const [showMessage, setShowMessage] = useState(false);
  const [pollSaveStatus, setPollSaveStatus] = useState<boolean>(false);

  useEffect(() => {
    ( async () => {
      if (state?.success) {
         toast.info("Validation passed. Saving poll to the database...");
         try {
          const status = await handlePollSubmit(poll, setPollSaveStatus);
          if (status?.success) {
            toast.success("Poll submitted successfully!");
            setPoll(initialPollState);
          } else {
            toast.error(`Poll submission failed. Please try again ${status?.error}`)
          }
        } catch (err) {
          console.log("Poll DB error:", err);
          toast.error("Poll submission failed. See console for details.");
        }
      }
    })();
  }, [state])

  useEffect(() => {
    if (pollSaveStatus) {
      toast.info("start time adjusted to at 1 minute from now.");
      setPollSaveStatus(false);
    }
  }, [pollSaveStatus]);

  function expiresInMs(duration: string): number{
    return durationMap[duration as keyof typeof durationMap] || 0;
  }


  // const handleAttempt = () => {
  //   // When user tries to toggle, show message briefly
  //   setShowMessage(true);
  //   setTimeout(() => setShowMessage(false), 2500); // disappear after 2.5s
  // };

   const handleSubmit = async () => {
    // Example: Call your Supabase function or API route here
    toast.info("Submitting poll...");

    console.log("Poll Data:", poll);
    if (state?.success) {
    const status = await handlePollSubmit(poll, setPollSaveStatus);
      if (!status) {
        toast.error("Poll submission failed. Please try again.");
      }
    
      toast.success("Poll submitted successfully!");
    } else {
      toast.error("Poll submission failed due to validation errors. Please fix the errors and try again.");
    }
  };

  return (
    <main>
      <form action={action} className="max-w-3xl mx-auto my-10">
      <Card className="p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl font-bold">Create a New Poll</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label className="font-medium mb-3">Poll Title</Label>
            <Input
              name="title"
              placeholder="Enter poll title"
              value={poll.title}
              maxLength={40}
              onChange={(e) => setTitle(e.target.value )}
              required
            />
            {state?.error?.title && (<p className="text-red-500">{state.error.title}</p>)}
           </div>
          <div>
            <Label className="font-medium mb-3">Description (optional)</Label>
            <Textarea
              placeholder="Describe your poll..."
              value={poll.description}
              name="description"
              maxLength={200}
              onChange={(e) => setDescription(e.target.value )}
            />
            {state?.error?.description && (<p className="text-red-500">{state.error.description}</p>)}
          </div>
          <div>
            <Label className="font-medium mb-3">Question Type</Label>
            <Select
                onValueChange={(value) => setQuestionType(value)}
                value={poll.questionType ?? undefined}
                name="questionType"
                required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Question Type: " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
                <SelectItem value="single">Single Selection</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
                <SelectItem value="open">Open Ended</SelectItem>
              </SelectContent>
            </Select>
            {state?.error?.questionType && (<p className="text-red-500">{state.error.questionType}</p>)}
          </div>
      {(poll.questionType === "single" || poll.questionType === "multiple") && (
          <div className="space-y-2">
              <label className="font-medium">Options</label>
              {poll.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  {
                    !option.isChecked ?
                    <div> 
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={ option.optionText }
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                      />
                      { option.error && <p className="text-red-500">{option.error}</p> }
                    </div> 
                    : (<p className="text-gray-500">{poll.options?.[index].optionText}</p>)
                  }
                  <Button size="icon" variant="ghost" onClick={() => toggleOptionsEdit(index)}>
                    { !option.isChecked ? <FaCheck className="w-4 h-4 text-green-500" /> : <FaEdit className="w-4 h-4 text-blue-500" /> }
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    className="text-red-500"
                  >
                    <FaTrash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div>
                <Input
                type="hidden"
                name="options"
                value={poll.options ? JSON.stringify(poll.options.map((value) => value.optionText)) : ""} 
                />
              </div>
             
              {
                (poll.options?.length ?? 0) < 5 ? (
                <Button variant="outline" size="sm" onClick={addOption}>
                    <FaPlus className="w-4 h-4 mr-1" /> Add Option
                </Button>)
                : <div className="text-sm text-red-600">Maximum of 5 options allowed.</div>
              }
               { state?.error?.options && (<p className="text-red-500">{state.error.options}</p>)}
            </div>
          )}
          {
            (poll.questionType === "rating" || poll.questionType === "scale") && (
           <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-sm">{poll.questionType.toUpperCase()} CONFIGURATION</h3>
              <p className="text-md text-blue-500">Scale is fixed from 1 to 5</p>
              <Input
                type="number"
                placeholder="Min Value (e.g., 1"
                min={1}
                max={10}
                value={poll.min ?? ""}
                onChange={(e) => setMin(Number(e.target.value))}
                className="bg-white"
                disabled={true}
              />
              <Input
                type="number"
                placeholder="Max Value (e.g., 5)"
                min={1}
                max={10}
                value={poll.max ?? ""}
                onChange={(e) => setMax(Number(e.target.value))}
                className="bg-white"
                disabled={true}
              />
              </div> 
            )
          }
          {
            (poll.questionType === "open") && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-sm">OPEN ENDED CONFIGURATION</h3>
                <Input
                  type="number"
                  placeholder="Max Character Limit (e.g., 200)"
                  min={1}
                  max={500}
                  value={poll.openCharLimit ?? ""}
                  onChange={(e) => setOpenCharLimit(Number(e.target.value))}
                  className="mb-2 bg-white" 
                />
              </div>
            )
          }
          {/* Poll Duration */}
          <div>
            <h3 className="font-medium">Start Time</h3>
            <div className="mb-4">
              <Input
                type="datetime-local"
                name="startTime"
                value={poll.startTime || ""}
                placeholder="Insert start time of poll"
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              {state?.error?.startTime && (<p className="text-red-500">{state.error.startTime}</p>)}
            </div>
            <div>
              <Label className="font-medium mb-3">Duration</Label>
              <Select
                onValueChange={(value) => setDuration(value)}
                value={poll.duration ?? undefined}
                name="duration"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duration of Poll" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Minute</SelectItem>
                  <SelectItem value="5m">5 Minutes</SelectItem>
                  <SelectItem value="10m">10 Minutes</SelectItem>
                  <SelectItem value="30m">30 Minutes</SelectItem>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="6h">6 Hours</SelectItem>
                  <SelectItem value="12h">12 Hours</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
              </SelectContent>
              </Select>
              {state?.error?.duration && (<p className="text-red-500">{state.error.duration}</p>)}
            </div>
          </div>
          { /**Poll start time and duration Info */}
          {poll.startTime && poll.duration && (
            <div className="text-sm text-gray-600 mt-2">
              Poll will start on <strong>{new Date(poll.startTime).toLocaleString()}</strong>&nbsp;
              and end on <strong>{new Date(new Date(poll.startTime).getTime() + expiresInMs(poll.duration)).toLocaleString()}</strong>.
            </div>
          )}
           {/* Settings */}
          <div className="flex items-center justify-between relative">
            <Label className="font-medium">Allow Anonymous Voting</Label>
            <Switch
              checked={true}
              disabled={true}
            />
          </div>

          {/* Submit Button */}

          <Button className="w-full" onClick={handleSubmit} type="submit" name="createPoll" disabled={pending}>
            { pending ? "Validating..." : "Create Poll" }
          </Button>
        </CardContent>
      </Card>
      </form>
    </main>
  )
}

export default CreatePollpage;