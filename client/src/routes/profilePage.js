import React from "react";
import {useGetUserInfo} from '../hooks/api/user/useGetUserInfo';
import { useAuth } from "../components/common/AuthProvider";

export default function ProfilePage({}) {
  const {user} = useAuth();
  const {data} = useGetUserInfo(user.userDetails.email);
  if (data) {
    return (
      <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
              User Profile
          </h3>
          {data.userDetails.isAdmin ? (
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Administrator
            </p>) : null}
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        User name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.userDetails.username}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Email address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.userDetails.email}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Solved questions
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.userDetails.solvedQuestions}
                    </dd>
                </div>
            </dl>
        </div>
      </div>
    );
  }
  
}
