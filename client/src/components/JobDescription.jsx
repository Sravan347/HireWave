

import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { MapPin, Briefcase, DollarSign, CalendarDays, Users } from 'lucide-react';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
            
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(application => application.applicant === user?._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge variant="outline" className="text-blue-600 font-medium">
              {singleJob?.position || '1'} Position
            </Badge>
            <Badge variant="outline" className="text-green-700 font-medium">
              {singleJob?.jobType || 'Onsite'}
            </Badge>
            <Badge variant="outline" className="text-purple-700 font-medium">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 ${isApplied
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#7209b7] hover:bg-[#5f32ad]'
            }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h2 className="border-b border-gray-300 mt-6 pb-2 text-lg font-semibold text-gray-700">Job Details</h2>

      <div className="mt-4 text-gray-800 space-y-3">
        <p className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#7209b7]" />
          <strong>Role:</strong> {singleJob?.title}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#7209b7]" />
          <strong>Location:</strong> {singleJob?.location}
        </p>
        <p className="flex items-start gap-2">
          <span className="pt-1"><Briefcase className="w-5 h-5 text-[#7209b7]" /></span>
          <strong>Description:</strong> {singleJob?.description}
        </p>
         <p className="flex items-start gap-2">
          <span className="pt-1"><Briefcase className="w-5 h-5 text-[#7209b7]" /></span>
          <strong>Requirements:</strong> {singleJob?.requirements}
        </p>
        <p className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#7209b7]" />
          <strong>Experience:</strong> {singleJob?.experienceLevel} yrs
        </p>
        <p className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#7209b7]" />
          <strong>Salary:</strong> {singleJob?.salary} LPA
        </p>
        <p className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#7209b7]" />
          <strong>Total Applicants:</strong> {singleJob?.applications?.length || 0}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-[#7209b7]" />
          <strong>Posted On:</strong> {singleJob?.createdAt?.split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
