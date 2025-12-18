const ContactForm = () => {
  return (
    <section className="w-full text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-7 gap-10 md:px-8">
        {/* LEFT TEXT CONTENT */}
        <div className="flex flex-col justify-center md:col-span-4 ">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-[130%]">
            Get in touch with us
          </h2>

          <p className="text-white/40 font-Lufga md:text-xl leading-7 mb-10">
            Have questions, ideas, or want to bring DesiCodes to your
            institution? We'd love to hear from you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                ✉️
              </span>
              <div>
                <p className="font-medium">E-Mail</p>
                <p className="text-gray-400 text-sm">contact@desicodes.in</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                ✉️
              </span>
              <div>
                <p className="font-medium">For institutional partnerships</p>
                <p className="text-gray-400 text-sm">partners@desicodes.in</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                📍
              </span>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-400 text-sm">Guwahati, Assam, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTACT FORM */}
        <form className="bg-[#171717] md:col-span-3 border border-white/40 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold leading-6">Contact Form</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-1 rounded-lg bg-[#262626] border border-white shadow-sm outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-1 rounded-lg bg-[#262626] border border-white shadow-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">E-Mail *</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-1 rounded-lg bg-[#262626] border border-white shadow-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-1 rounded-lg bg-[#262626] border border-white shadow-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows={5}
              placeholder="Type your msg here......"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-[#262626] placeholder-white placeholder:text-xs border border-white shadow-sm outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 text-sm text-black border border-white font-medium bg-[#EBEBEBB8] rounded-md hover:bg-[#cfcfcf] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
