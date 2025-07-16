import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		mode: "onBlur",
	});

	const handleFormSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		setSubmitMessage(null);

		try {
			const formData = new FormData();
			formData.append("name", data.name);
			formData.append("email", data.email);
			formData.append("subject", data.subject);
			formData.append("message", data.message);

			const response = await fetch("/contact", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText);
			}

			reset();
			setSubmitMessage({
				type: "success",
				message: "Thank you for your message! I'll get back to you soon.",
			});
		} catch (error) {
			setSubmitMessage({
				type: "error",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while sending your message.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-gradient-to-b from-slate-300 to-slate-400/50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl px-6 sm:px-8 lg:px-16 py-8">
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="space-y-6"
				noValidate
			>
				{/* Name */}
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>
						Name <span className="text-red-500">*</span>
					</label>
					<input
						{...register("name")}
						type="text"
						id={useId()}
						className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 ${
							errors.name
								? "border-red-500"
								: "border-gray-400 dark:border-gray-600"
						}`}
						placeholder="John Doe"
					/>
					{errors.name && (
						<div className="text-red-500 text-sm mt-1">
							{errors.name.message}
						</div>
					)}
				</div>

				{/* Email Address */}
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>
						Email Address <span className="text-red-500">*</span>
					</label>
					<input
						{...register("email")}
						type="email"
						id={useId()}
						className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 ${
							errors.email
								? "border-red-500"
								: "border-gray-400 dark:border-gray-600"
						}`}
						placeholder="example@email.com"
					/>
					{errors.email && (
						<div className="text-red-500 text-sm mt-1">
							{errors.email.message}
						</div>
					)}
				</div>

				{/* Subject */}
				<div>
					<label
						htmlFor="subject"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>
						Subject <span className="text-red-500">*</span>
					</label>
					<input
						{...register("subject")}
						type="text"
						id={useId()}
						className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 ${
							errors.subject
								? "border-red-500"
								: "border-gray-400 dark:border-gray-600"
						}`}
						placeholder="Subject of your inquiry"
					/>
					{errors.subject && (
						<div className="text-red-500 text-sm mt-1">
							{errors.subject.message}
						</div>
					)}
				</div>

				{/* Message */}
				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>
						Message <span className="text-red-500">*</span>
					</label>
					<textarea
						{...register("message")}
						id={useId()}
						rows={6}
						className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 resize-none ${
							errors.message
								? "border-red-500"
								: "border-gray-400 dark:border-gray-600"
						}`}
						placeholder="Tell me about your project or inquiry..."
					/>
					{errors.message && (
						<div className="text-red-500 text-sm mt-1">
							{errors.message.message}
						</div>
					)}
				</div>

				{/* Success and Error Messages */}
				{submitMessage && (
					<div className="mt-6">
						<div
							className={`${
								submitMessage.type === "success"
									? "bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300"
									: "bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300"
							} px-4 py-3 rounded-lg`}
						>
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									aria-label={
										submitMessage.type === "success" ? "Success" : "Error"
									}
								>
									<title>Success</title>
									{submitMessage.type === "success" ? (
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									) : (
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clipRule="evenodd"
										/>
									)}
								</svg>
								<span>{submitMessage.message}</span>
							</div>
						</div>
					</div>
				)}

				{/* Submit Button */}
				<div className="text-center">
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-label="Send icon"
						>
							<title>Submit</title>
							<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
						</svg>
						<span>{isSubmitting ? "Sending..." : "Send Message"}</span>
					</button>
				</div>
			</form>
		</div>
	);
}
