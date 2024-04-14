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

import { MatchPolling } from "../components/matcher/matchPolling";

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
  const { user, isLoading } = useAuth();
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

  const watchAllFields = watch();

  useEffect(() => {
    if (user) {
      setValue("userId", user.userDetails._id);
    }
  }, [user, setValue]);

  if (isLoading) {
    return <div>Loading...</div>; // or your custom loading component
  }

  const onSubmit = () => {
    const data = getValues();
    joinQueue({ data: data });
    setRenderMatching(true);
  };

  return (
    <div className="w-full max-w-2xl">
      {user ? (
        <div>
          <Stepper currentStep={currentStep} />
          <div className="flex flex-wrap gap-2 mt-10">
            {!renderMatching && currentStep === 0 && (
              <CategorySelection setValue={setValue} />
            )}
            {!renderMatching && currentStep === 1 && (
              <ComplexitySelection setValue={setValue} />
            )}
            {!renderMatching && currentStep === 2 && (
              <>
                <div>
                  <h1>Review your selection</h1>
                  <h2>Category: {watchAllFields.category}</h2>
                  <h2>Complexity: {watchAllFields.complexity}</h2>
                </div>
              </>
            )}
          </div>
          {!renderMatching && (
            <div className="flex flex-column mt-10 justify-end">
              <Button onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
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
              <MatchPolling userId={user.userDetails._id} />
              <Button onClick={() => setRenderMatching(false)}>
                Cancel Matching
              </Button>
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