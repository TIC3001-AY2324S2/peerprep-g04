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
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleButtonClick = (category) => {
    setValue("category", category);
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        className="focus:ring-0 focus:ring-offset-0"
        outline={selectedCategory !== "Array"}
        gradientDuoTone="purpleToBlue"
        onClick={() => handleButtonClick("Array")}
      >
        Array
      </Button>
    </div>
  );
}
function ComplexitySelection({ setValue }) {
  const [selectedComplexity, setSelectedComplexity] = useState(null);
  const handleButtonClick = (complexity) => {
    setValue("complexity", complexity);
    setSelectedComplexity(complexity);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        className="focus:ring-0 focus:ring-offset-0"
        outline={selectedComplexity !== "Easy"}
        gradientDuoTone="purpleToBlue"
        onClick={() => handleButtonClick("Easy")}
      >
        Easy
      </Button>
      <Button
        className="focus:ring-0 focus:ring-offset-0"
        outline={selectedComplexity !== "Medium"}
        gradientDuoTone="cyanToBlue"
        onClick={() => handleButtonClick("Medium")}
      >
        Medium
      </Button>
      <Button
        className="focus:ring-0 focus:ring-offset-0"
        outline={selectedComplexity !== "Hard"}
        gradientDuoTone="greenToBlue"
        onClick={() => handleButtonClick("Hard")}
      >
        Hard
      </Button>
    </div>
  );
}

export default function MatchingPage() {
  const { user, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [renderMatching, setRenderMatching] = useState(false);
  const navigate = useNavigate();
  const { mutate: joinQueue } = useJoinQueue();
  const userId = user?.userDetails._id;
  const { data: isAlreadyMatched, isLoading: isLoadingFindAlreadyMatched } =
    useGetFindMatchByUserId(userId);

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
    category: "Array",
    complexity: "Easy",
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

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && !user) {
    return (
      <div className="w-full max-w-2xl">
        <Card className="p-4">
          <h2 className="text-2xl font-bold">You are not logged in</h2>
          <Button onClick={() => navigate("/auth")}>Log in</Button>
        </Card>
      </div>
    );
  }
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
              <Button
                className="focus:ring-0 focus:ring-offset-0"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            )}
            {currentStep !== 2 && (
              <Button
                className="focus:ring-0 focus:ring-offset-0"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            {currentStep === 2 && (
              <Button
                className="focus:ring-0 focus:ring-offset-0"
                onClick={handleSubmit(onSubmit)}
              >
                Join Queue
              </Button>
            )}
          </div>
        )}
        {renderMatching && (
          <>
            <Stopwatch
              onTimeReached={handleSubmit(() => onLeave(true))}
              targetTime={30}
              stopwatchRunning={true}
            />
            <MatchPolling userId={user?.userDetails._id} formData={formData} />
            <div className="flex flex-column mt-10 justify-end gap-2">
              <Button onClick={handleSubmit(() => onLeave(false))}>
                Cancel Matching
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
