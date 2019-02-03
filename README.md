# Nova TimeTracker Field

[![Total Downloads](https://img.shields.io/packagist/dt/cloudstudio/time-tracker.svg?style=flat-square)](https://packagist.org/packages/cloudstudio/time-tracker)

Resource Generator for Laravel Nova

##### TimeTracker Field Preview

![Resource Generator Tool](https://user-images.githubusercontent.com/3589377/52174968-74d4df00-279c-11e9-8538-87aac6721e8b.png)


### Installation

You can install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require cloudstudio/nova-time-tracker-field
```

Next up, you must register the field with Nova. This is typically done in the resource file.

```php

use Cloudstudio\TimeTracker\TimeTracker;

TimeTracker::make('Hours', 'seconds', function () {
	return gmdate("H:i:s", $this->seconds);
})->sortable(),

```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.


## Credits

- [Toni Soriano](https://github.com/cloudstudio)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
