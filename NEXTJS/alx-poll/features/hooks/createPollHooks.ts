import { optionsType, PollFormInputs } from "@/features/auth/authSchema";
import { Value } from "@radix-ui/react-select";
import { useState } from "react";

export const initialPollState: PollFormInputs = {
    title: "",
    description: "",
    questionType: undefined,
    options: undefined,
    anonymous: true,
    min: 1,
    max: 5,
    openCharLimit: undefined,
    startTime: "",
    duration: undefined
  }


export const durationMap = {
      "1m": 60 * 1000,
      "5m": 5 * 60 * 1000,
      "10m": 10 * 60 * 1000,
      "30m": 30 * 60 * 1000,
      "1h": 60 * 60 * 1000,
      "6h": 6 * 60 * 60 * 1000,
      "12h": 12 * 60 * 60 * 1000,
      "1d": 24 * 60 * 60 * 1000,
 };


export function expiresInMs(duration: string): number{
  if (!duration) return 0;
  return durationMap[duration as keyof typeof durationMap] || 0;
}

export const usePoll = (initialState: PollFormInputs = initialPollState) => {
  const [poll, setPoll] = useState(initialState);

  const addOption = () => {
    setPoll((prev) => ({
       ...prev, 
      options: [
        ...(prev.options  ?? []),
        { optionText: "", isChecked: false, error: undefined } 
      ]
    }));
  };

  const removeOption = (index: number) => {
    const newOptions = poll.options?.filter((_, i) => i !== index);
    setPoll((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) 
    }));
  };

    
  const handleOptionChange = (index: number, value: string) => {
    setPoll((prev) => {
      const newOption =  [...(prev.options ?? [])];
      newOption[index] = { ...newOption[index], optionText: value };
      return ({ 
        ...prev, 
        options: newOption });
    })
  }

  const toggleOptionsEdit = (index: number) => {
    setPoll((prev) => {
      const options = [...(prev.options ?? [])];
      const target = options[index];
      const isEmpty = target.optionText.trim() === "";
  
      options[index] = { 
        ...target,
        error: isEmpty ? "Option text cannot be empty." : undefined,
        isChecked: isEmpty ? false : !target.isChecked, 
      };

      return {...prev, options, }
    })
  }

   const setQuestionType = (value: string) => {
    setPoll((prev) => ({
      ...prev,
      questionType: value,
      options: (value !== "single" && value !== "multiple") ? undefined : prev.options ?? [],
    }));

  }

  const setTitle = (value: string) => setPoll(prev => ({ ...prev, title: value}))
  const setDescription = (value: string) => setPoll( prev => ({ ...prev, description: value }))
  const setStartTime = (value: string) => setPoll(prev => ({ ...prev, startTime: value }));
  const setDuration = (value: string) => setPoll(prev => ({ ...prev, duration: value }));
  const setMin = (value: number | undefined) => setPoll(prev => ({ ...prev, min: value }));  
  const setMax= (value: number | undefined) => setPoll(prev => ({ ...prev, max: value }));  
  const setOpenCharLimit = (value: number | undefined) => setPoll(prev => ({ ...prev, openCharLimit: value }));


  return {
    poll,
    setPoll,
    addOption,
    removeOption,
    handleOptionChange,
    toggleOptionsEdit,
    setQuestionType,
    setTitle,
    setDescription,
    setStartTime,
    setDuration,
    setOpenCharLimit,
    setMin,
    setMax
  }

}

export const pollstatus = (OneMinuteAdded: boolean = false) => {
  const [oneMinuteAdded, setOneMinuteAdded] = useState(OneMinuteAdded);

  const changeOneminuteStatus = () => setOneMinuteAdded((prev) => !prev );

  return {
    oneMinuteAdded,
    changeOneminuteStatus
  }
}