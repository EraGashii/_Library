export default function Unauthorized() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">⚠️ Nuk keni qasje</h1>
          <p className="text-lg">Kjo faqe është e dedikuar vetëm për përdorues të llojit <strong>user</strong>.</p>
        </div>
      </div>
    );
  }
  