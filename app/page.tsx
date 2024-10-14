import ContactForm from "./components/ContactForm"

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-sm bg-white rounded-lg shadow-md p-6 sm:max-w-4xl sm:rounded-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-grey-900 mb-6">
          Contact Us
        </h1>
        <ContactForm />
      </div>
    </div>
  )
}
