import React, { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import { Stepper } from "../components/matcher/stepper";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../components/common/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useJoinQueue } from "../hooks/api/match/useJoinQueue";
import { Spinner } from "flowbite-react";
import { MatchPolling } from "../components/matcher/matchPolling";
import { useGetFindMatchByUserId } from "../hooks/api/match/useGetFindMatchByUserId";
import { Stopwatch } from "../components/common/Stopwatch";
import { toast } from "react-toastify";

function CategorySelection({ setValue }) {
  const handleButtonClick = (category) => {
    setValue("category", category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        outline
        gradientDuoTone="purpleToBlue"
        onClick={() => handleButtonClick("Array")}
      >
        Array
      </Button>
      <Button
        outline
        gradientDuoTone="cyanToBlue"
        onClick={() => handleButtonClick("String")}
      >
        String
      </Button>
      <Button
        outline
        gradientDuoTone="greenToBlue"
        onClick={() => handleButtonClick("Binary tree")}
      >
        Binary tree
      </Button>
      <Button
        outline
        gradientDuoTone="purpleToPink"
        onClick={() => handleButtonClick("Sorting")}
      >
        Sorting
      </Button>
      <Button
        outline
        gradientDuoTone="pinkToOrange"
        onClick={() => handleButtonClick("Linked Lists")}
      >
        Linked Lists
      </Button>
      <Button
        outline
        gradientDuoTone="tealToLime"
        onClick={() => handleButtonClick("Algorithms")}
      >
        Algorithms
      </Button>
      <Button
        outline
        gradientDuoTone="redToYellow"
        onClick={() => handleButtonClick("Graphs")}
      >
        Graphs
      </Button>
    </div>
  );
}

function ComplexitySelection({ setValue }) {
  const handleButtonClick = (complexity) => {
    setValue("complexity", complexity);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        outline
        gradientDuoTone="purpleToBlue"
        onClick={() => handleButtonClick("Easy")}
      >
        Easy
      </Button>
      <Button
        outline
        gradientDuoTone="cyanToBlue"
        onClick={() => handleButtonClick("Medium")}
      >
        Medium
      </Button>
      <Button
        outline
        gradientDuoTone="greenToBlue"
        onClick={() => handleButtonClick("Hard")}
      >
        Hard
      </Button>
    </div>
  );
}

export default function MatchingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [renderMatching, setRenderMatching] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.userDetails._id;
  const { data: isAlreadyMatched, isLoading: isLoadingFindAlreadyMatched } =
    useGetFindMatchByUserId(userId);
  const { mutate: joinQueue } = useJoinQueue();

  // ----------------------------------
  // FORM VALIDATIONS - with ZOD
  // ----------------------------------
  const schema = z.object({
    category: z.string().min(1, "Please enter a category"),
    complexity: z.string().min(1, "Please select a complexity"),
  });

  const initialFormValues = {
    status: "JOIN",
    userId: "",
    userName: "",
    category: "",
    complexity: "",
    matchType: "SAME",
  };

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialFormValues,
  });

  const formData = watch();

  useEffect(() => {
    if (user) {
      setValue("userId", user?.userDetails._id);
      setValue("userName", user?.userDetails.username);
    }
  }, [user, setValue]);

  if (isAlreadyMatched && !isLoadingFindAlreadyMatched) {
    navigate("/matchDetails");
  }

  const onSubmit = () => {
    const data = getValues();
    toast.success("Joined Queue.", {
      autoClose: 500, // 5 seconds
    });
    joinQueue({ data: data });
    setRenderMatching(true);
  };

  const onLeave = (isTimeout = false) => {
    const data = getValues();
    data.status = "LEAVE";
    if (!isTimeout) {
      toast.info("Left queue.", {
        autoClose: 500, // 5 seconds
      });
    } else {
      toast.error("Matching timed out. Leaving queue.", {
        autoClose: 500, // 5 seconds
      });
    }
    joinQueue({ data: data });
    setRenderMatching(false);
  };

  return (
    <div className="w-full max-w-2xl">
      {user ? (
        <div>
          <Stepper currentStep={currentStep} />
          <div className="flex flex-wrap gap-2 mt-10">
            {!renderMatching && currentStep === 0 && (
              <CategorySelection setValue={setValue} formState={formData} />
            )}
            {!renderMatching && currentStep === 1 && (
              <ComplexitySelection setValue={setValue} formState={formData} />
            )}
            {!renderMatching && currentStep === 2 && (
              <>
                <div>
                  <h1>Review your selection</h1>
                  <h2>Name: {formData.userName}</h2>
                  <h2>Category: {formData.category}</h2>
                  <h2>Complexity: {formData.complexity}</h2>
                </div>
              </>
            )}
          </div>
          {!renderMatching && (
            <div className="flex flex-column mt-10 justify-end gap-2">
              {currentStep > 0 && (
                <Button onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              )}
              {currentStep !== 2 && (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              {currentStep === 2 && (
                <Button onClick={handleSubmit(onSubmit)}>Join Queue</Button>
              )}
            </div>
          )}
          {renderMatching && (
            <>
              <Stopwatch
                onTimeReached={handleSubmit(() => onLeave(true))}
                targetTime={30}
              />
              <MatchPolling
                userId={user?.userDetails._id}
                formData={formData}
              />
              <div className="flex flex-column mt-10 justify-end gap-2">
                <Button onClick={handleSubmit(() => onLeave(false))}>
                  Cancel Matching
                </Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <Card className="p-4">
            <h2 className="text-2xl font-bold">You are not logged in</h2>
            <Button onClick={() => navigate("/auth")}>Log in</Button>
          </Card>
        </div>
      )}
    </div>
  );
}
