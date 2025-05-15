<?php

namespace tests;

use PHPUnit\Framework\TestCase;
use SPOONBOOKING;

class SPOONBOOKINGTEST extends TestCase
{
    protected function setUp(): void
    {
        SPOONBOOKING::init('scoop');
    }

    public function testSelectReservasReturnsArray()
    {
        $userId = 17;
        $result = SPOONBOOKING::selectReservas($userId);
        $this->assertIsArray($result);
    }
}