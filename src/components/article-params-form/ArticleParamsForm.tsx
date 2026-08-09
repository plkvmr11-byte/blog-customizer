import { type FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const formContainerRef = useRef<HTMLDivElement>(null);

	const handleArrowClick = () => {
		setIsOpen((currentIsOpen) => !currentIsOpen);
	};

	const handleFontFamilyChange = (fontFamilyOption: OptionType) => {
		setFormState((currentFormState) => ({
			...currentFormState,
			fontFamilyOption,
		}));
	};

	const handleFontSizeChange = (fontSizeOption: OptionType) => {
		setFormState((currentFormState) => ({
			...currentFormState,
			fontSizeOption,
		}));
	};

	const handleFontColorChange = (fontColor: OptionType) => {
		setFormState((currentFormState) => ({
			...currentFormState,
			fontColor,
		}));
	};

	const handleBackgroundColorChange = (backgroundColor: OptionType) => {
		setFormState((currentFormState) => ({
			...currentFormState,
			backgroundColor,
		}));
	};

	const handleContentWidthChange = (contentWidth: OptionType) => {
		setFormState((currentFormState) => ({
			...currentFormState,
			contentWidth,
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			const { target } = event;

			if (
				target instanceof Node &&
				!formContainerRef.current?.contains(target)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);

		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<div ref={formContainerRef}>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Настройки статьи
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
