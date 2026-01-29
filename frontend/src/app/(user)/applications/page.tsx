import MyApplications from "./components/MyApplications";

export default function ApplicationsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          My Applications
        </h1>
        <p className="text-content">
          Track the status of your job applications
        </p>
      </div>

      <MyApplications />
    </div>
  );
}
