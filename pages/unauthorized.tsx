export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Qasje e ndaluar</h1>
        <p className="text-gray-700">
          Ju nuk keni të drejta për të hyrë në këtë faqe.
        </p>
      </div>
    </div>
  );
}
